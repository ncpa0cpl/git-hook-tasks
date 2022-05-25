export declare const loadingLine: (label: string, progress?: string | undefined) => {
    finishSuccess: () => void;
    finishFailure: () => void;
    updateProgress: (progress: string) => void;
};
