const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <span className="ml-2 text-gray-600">Loading products...</span>
    </div>
  );
};

export default LoadingSpinner;