const opentelemetry = require('@opentelemetry/sdk-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'capsule-corp',
    })
})

const traceExporterOptions = {
    url: 'localhost:55681/v1/traces',
};

const metricExporterOptions = {
    url: 'localhost:55681/v1/metrics',
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
