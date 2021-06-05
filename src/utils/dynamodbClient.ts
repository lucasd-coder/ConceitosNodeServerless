import { DynamoDB } from 'aws-sdk';

const options = {
    region: 'localhost',
    endpoint: 'http://localhost:8080'
};


export const document = new DynamoDB.DocumentClient(options)
 