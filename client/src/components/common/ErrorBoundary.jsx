import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RoamVista React Error Boundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] dark:bg-[#0C1210] text-[#1A201E] dark:text-[#F3F1EC] p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl font-bold">
              !
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold font-serif">Something unexpected occurred</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                The application encountered an unexpected state while loading the journey.
              </p>
            </div>
            {this.state.error?.message && (
              <div className="text-[11px] p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-mono text-left overflow-x-auto text-neutral-600 dark:text-neutral-300">
                {this.state.error.message}
              </div>
            )}
            <button
              type="button"
              onClick={this.handleReload}
              className="w-full py-3 px-4 rounded-xl bg-[#0F382C] text-white text-xs font-semibold hover:bg-[#164e3e] transition-colors"
            >
              Reload RoamVista
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
