const AWS = require("aws-sdk");
const codepipeline = new AWS.CodePipeline();

exports.handler = async (event) => {
    const jobId = event["CodePipeline.job"].id;

    try {
        // Add your Lambda logic here
        console.log("Processing pipeline job:", jobId);

        // Notify CodePipeline of success
        await codepipeline.putJobSuccessResult({ jobId }).promise();
        console.log("Successfully notified CodePipeline.");
        return {
            statusCode: 200,
            body: "Job completed successfully!",
        };
    } catch (error) {
        console.error("Error processing job:", error);

        // Notify CodePipeline of failure
        await codepipeline.putJobFailureResult({
            jobId,
            failureDetails: {
                message: error.message,
                type: "JobFailed",
            },
        }).promise();
        throw error; // Ensure Lambda shows an error
    }
};
