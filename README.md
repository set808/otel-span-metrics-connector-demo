# OpenTelemetry Span Metrics Connector Demo

This repo demonstrates how to use the [OpenTelemetry span metrics connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md) to extract metrics data from spans. The span metrics connector aggregates Request Error and Duration OpenTelemetry metrics from span data. The spans and metric data are sent to New Relic.

## Prerequisites
* Node
* New Relic API key 

## Installation

```npm install ```

In docker/collector-config.yml replace `${NEW_RELIC_API_KEY}` with the API key from your New Relic account

## Usage

### Simple span metrics connector configuration
Start the OpenTelemetry Collector with the following command
```
npm run docker:start
```
### Span metrics connector with head sampling configuration
Start the OpenTelemetry Collector with the following command
```
npm run docker:startHead
```
### Span metrics connector with tail sampling configuration
Start the OpenTelemetry Collector with the following command
```
npm run docker:startTail
```

In a separate terminal window run the API locally using
```
npm run instrumentation:start
```

The application should start running on localhost:3000. You can make requests to the API using the following routes:
```
localhost:3000/api/products - Get all products
localhost:3000/api/products/:id - get product by ID
localhost:3000/api/products/search?query=capsule - search products by name or description (case-sensitive)
```

To shutdown the collector container
```
npm run docker:stop
```

Once you start generating requests you should find the service `capsule-corp` in the entity explorer of your New Relic account. Go to distributed traces and you'll see the requests populate. long with the traces if you head to the Metrics Explorer you'll see the metrics **calls** and **duration**. Once selected you can then facet by dimensions.

### Head sampling
The head sampling demo makes use of the OpenTelemetry probabilisitc sampling processor. The demo is setup to get metrics from all incoming traces, but only collect 20% of traces.

### Tail sampling
The tail sampling demo makes use of the OpenTelemetry tail sampling processor. You will get metrics from all incoming traces, but only collect traces that generate errors.
