import path from 'path';
import { Kafka, Partitioners } from 'kafkajs';
import fs from 'fs/promises';

const CLIENT_ID = 'kafkajs-file-producer';
const KAFKA_SERVER = 'localhost:9092';
const TOPIC = 'filetransfer';

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: [KAFKA_SERVER]
});

const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

async function publish(fileName) {
    const fileBytes = await fs.readFile(fileName);
    producer.send({
        topic: TOPIC,
        messages: [
            {
                value: fileBytes,
                headers: {
                    filename: path.basename(fileName)
                }
            }
        ]
    }).then(() => {
        console.log(`File ${fileName} sent. (${fileBytes.length} Bytes)`);
        process.exit(0);
    });
}

await producer.connect();

await publish(process.argv[2]);
