# KafkaJS file producer

Producer example for the [Using Apache Kafka for transferring files](https://tsmx.net/using-apache-kafka-for-transferring-files/) article.

Uses the [KafkaJS](https://kafka.js.org/) library for Kafka client functionality.

# Usage

First, [get Kafka up & running](https://tsmx.net/using-apache-kafka-for-transferring-files/#Getting_Kafka_up_running) and [create an appropriate topic](https://tsmx.net/using-apache-kafka-for-transferring-files/#Creating_a_topic) as described in the tutorial.

To produce file messages, simply start the producer app and pass the desired file as an argument. Two example files are provided in the `samples/` directory.

```bash
$ node app.js ./samples/example.jpg
File ./samples/example.jpg sent. (2690215 Bytes)
```

The corresponding [consumer example](https://github.com/tsmx/kafkajs-file-consumer) is also available.