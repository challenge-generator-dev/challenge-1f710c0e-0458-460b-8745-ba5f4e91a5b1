import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

const getDynamoDBClientConfig = (): DynamoDBClient => {
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    const clientConfig: any = {
        region,
    };

    if (endpoint) {
        clientConfig.endpoint = endpoint;
        clientConfig.tls = false;
    }

    if (accessKeyId && secretAccessKey) {
        clientConfig.credentials = {
            accessKeyId,
            secretAccessKey,
        };
    }

    return new DynamoDBClient(clientConfig);
};

const getDocumentClientConfig = (): DynamoDBDocumentClientConfig => {
    const client = getDynamoDBClientConfig();
    
    const marshallOptions = {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    };

    const unmarshallOptions = {
        wrapNumbers: false,
    };

    const translateConfig = {
        marshallOptions,
        unmarshallOptions,
    };

    return {
        client,
        ...translateConfig,
    };
};

export const createDynamoDBDocumentClient = (): DynamoDBDocumentClient => {
    const config = getDocumentClientConfig();
    return DynamoDBDocumentClient.from(config);
};

export const getTableName = (): string => {
    const tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
    return tableName;
};

export const getDynamoDBClient = (): DynamoDBClient => {
    return getDynamoDBClientConfig();
};