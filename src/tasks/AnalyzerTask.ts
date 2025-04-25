// The abstract base class for all analyzer tasks
export abstract class AnalyzerTask<TInput, TOutput> {
    abstract analyze(input: TInput): Promise<TOutput>;
}