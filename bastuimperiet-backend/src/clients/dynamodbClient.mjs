import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.AWS_REGION) {
    console.warn("AWS_REGION saknas, defaultar till eu-north-1");
}

export const dynamoClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || "eu-north-1",
});
