import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.DYNAMO_ENDPOINT || "http://localhost:4566",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
});

export const getDynamoClient = () => dynamoDB;

export const dynamoService = {
  async createItem(params: AWS.DynamoDB.DocumentClient.PutItemInput) {
    return dynamoDB.put(params).promise();
  },

  async getItem(params: AWS.DynamoDB.DocumentClient.GetItemInput) {
    return dynamoDB.get(params).promise();
  },

  async updateItem(params: AWS.DynamoDB.DocumentClient.UpdateItemInput) {
    return dynamoDB.update(params).promise();
  },

  async deleteItem(params: AWS.DynamoDB.DocumentClient.DeleteItemInput) {
    return dynamoDB.delete(params).promise();
  },

  async queryItems(params: AWS.DynamoDB.DocumentClient.QueryInput) {
    return dynamoDB.query(params).promise();
  },

  async scanItems(params: AWS.DynamoDB.DocumentClient.ScanInput) {
    return dynamoDB.scan(params).promise();
  },
};
