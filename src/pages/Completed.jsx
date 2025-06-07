const Completed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg text-gray-700 mb-6">You have successfully completed the task.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Start Over
      </button>
    </div>
  );
}

export default Completed;