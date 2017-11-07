const fs = require('fs');
const path = require('path');
const NodeID3 = require('node-id3');

const workingDir = process.argv[2] || '.';
const album = process.argv[3] || undefined;

const results = fs.readdirSync(workingDir)
    .filter(filename => filename.endsWith('.mp3'))
    .map(filename => ({
        filename,
        matches: /^(\d+)\W*([0-9a-z ]+) - ([0-9a-z' ]+) ?/i.exec(filename)
    }))
    .map(captureGroups => ({
        filename: captureGroups.filename,
        id3: {
            trackNumber: captureGroups.matches[1].trim(),
            artist: captureGroups.matches[2].trim(),
            title: captureGroups.matches[3].trim(),
            album
        }
    }))
    .map(info => ({
        filename: info.filename,
        success: NodeID3.write(info.id3, path.join(workingDir, info.filename))
    }))
    .forEach(operation => console.log(`Writing ${operation.filename}: ${operation.success ? 'success' : 'failed'}`));