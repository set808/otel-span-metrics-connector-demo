const opentelemetry = require('@opentelemetry/sdk-node');
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'capsule-corp',
    })
})

const traceExporterOptions = {
    url: 'https://otlp.nr-data.net',
    headers: {
        'api-key': '6c30225764e4cafdee2e830bf52a5780FFFFNRAL',
    }
};

const metricExporterOptions = {
    url: 'https://otlp.nr-data.net',
    headers: {
        'api-key': '6c30225764e4cafdee2e830bf52a5780FFFFNRAL',
    },
    concurrencyLimit: 1,
};
const traceExporter = new OTLPTraceExporter(traceExporterOptions);

const sdk = new opentelemetry.NodeSDK({
    traceExporter: traceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(metricExporterOptions),
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
provider.register();

sdk.start()
