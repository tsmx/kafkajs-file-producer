import path from 'path';
import { Kafka, Partitioners } from 'kafkajs';
import fs from 'fs/promises';

const CLIENT_ID = 'kafkajs-file-producer';
const KAFKA_SERVER = 'localhost:9092';
const TOPIC = 'my.test.topic';

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: [KAFKA_SERVER]
});

const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

async function publish(fileName) {
    const fileBuffer = await fs.readFile(fileName);
    producer.send({
        topic: TOPIC,
        messages: [
            {
                value: fileBuffer,
                headers: {
                    filename: path.basename(fileName)
                }
            }
        ]
    }).then(() => {
        console.log(`File ${fileName} sent. (${fileBuffer.length} Bytes)`);
    });
}

await producer.connect();

await publish(process.argv[2]);
