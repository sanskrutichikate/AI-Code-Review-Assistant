function AnalysisCard({ result }) {

    return (

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition">

            {/* Title */}

            <h2 className="text-2xl font-bold mb-2">
                {result.title}
            </h2>

            {/* Language */}

            <p className="text-gray-600 mb-4">
                Language: <strong>{result.language}</strong>
            </p>

            {/* Severity */}

            <div
                className={`inline-block px-3 py-1 rounded-full text-white font-semibold mb-4
                ${
                    result.severity === "Error"
                        ? "bg-red-400"
                        : "bg-yellow-500"
                }`}
            >
                {result.severity}
            </div>

            {/* Rule */}

            <p className="mb-2">
                <strong>Rule:</strong> {result.rule_name}
            </p>

            {/* Message */}

            <p className="mb-2">
                <strong>Message:</strong> {result.message}
            </p>

            {/* Line */}

            <p className="mb-2">
                <strong>Line:</strong> {result.line_number}
            </p>

            {/* Column */}

            <p>
                <strong>Column:</strong> {result.column_number}
            </p>

        </div>

    );

}

export default AnalysisCard;