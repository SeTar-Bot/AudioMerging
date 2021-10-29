import Ffmpeg from 'fluent-ffmpeg'

/**
 * @module @setar/audiomerging
 * @function
 * @description Merge Sounds files and connect them at the end of each other like a chain
 * @param {Array<String>} files an Array of files addresses to be connected to eachother
 * @param {String} outputFile a File address so your file would be saved there
 * @returns {Promise} Resolves nothing when the action is done and the errors would be rejected
 */
export const AudioMerging = (files, outputFile) => {

    return new Promise((resolve, reject) => {

        if(!files || typeof files != "object" || files.length <= 0)
            reject(new Error('Files input is invalid.'));

        if(!outputFile || typeof outputFile != "string")
            reject(new Error('Output files is invalid.'));

        var filter = `concat:${files.join("|")}`;
        var ffmpegRenderer = Ffmpeg()
        .input(filter)
        .outputOptions('-acodec copy')
        .save(outputFile);

        ffmpegRenderer.on("error", (error, stderr, stdout) => {
            reject({error, ffmpegError: stderr, ffmpegOutput: stdout})
        });

        ffmpegRenderer.on("end", (ms) => {
            resolve();
        });
    });

}