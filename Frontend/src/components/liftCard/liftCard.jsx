
export const LiftCard = ({ lift }) => {
    // Format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const timeString = date.toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Check if it's today or tomorrow
        if (date.toDateString() === today.toDateString()) {
            return `I dag ${timeString}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `I morgen ${timeString}`;
        } else {
            const dayMonth = date.toLocaleDateString('da-DK', {
                day: 'numeric',
                month: 'short'
            });
            return `${dayMonth} ${timeString}`;
        }
    };

    const renderStars = (rating = lift.user.avgStars) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };


    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-100 max-w-[800px] mx-auto">
            <div className="flex items-center justify-between">
                {/* Left section - Driver info and locations */}
                <div className="flex items-center space-x-4 flex-1 border-r-2 border-gray-200 pr-4">
                    {/* Driver avatar and info */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                            {lift.user?.imageUrl ? (
                                <img
                                    src={lift.user.imageUrl}
                                    alt={lift.user.firstname}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white font-semibold text-lg">
                                    {lift.user?.firstname?.charAt(0) || 'U'}
                                </span>
                            )}
                        </div>
                        <div className="text-center mt-1">
                            <p className="font-semibold text-sm text-gray-800">
                                {lift.user?.firstname || 'Driver'}
                            </p>
                            {renderStars()}
                        </div>
                    </div>
                </div>


                {/* Date/Time and Route */}
                <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-2">
                        {formatDateTime(lift.departureDate)}
                    </p>

                    {/* Route with icons */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border-2 border-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                                {lift.cityDeparture || 'Departure'}
                            </span>
                            <span className="text-xs text-gray-400">
                                {lift.addressDeparture || ''}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border-2 border-green-500 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-600">
                                {lift.cityDestination || 'Destination'}
                            </span>
                            <span className="text-xs text-gray-400">
                                {lift.addressDestination || ''}
                            </span>
                        </div>
                    </div>
                </div>



                {/* Right section - Amenities and Price */}
                <div className="flex flex-col items-end space-y-2">
                    {/* Amenities icons */}
                    <div className="flex space-x-2">
                        {lift.wifi && (
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-xs">📶</span>
                            </div>
                        )}
                        {lift.charging && (
                            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-xs">⚡</span>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="font-bold text-xl text-gray-800">
                            DKK {lift.pricePerSeat || 125}
                        </p>
                    </div>

                    {/* Available seats indicators */}
                    <div className="flex space-x-1">
                        {[1, 2, 3].map((seat) => (
                            <div
                                key={seat}
                                className={`w-3 h-3 rounded-full ${seat <= ((lift.seatsTotal || 4) - (lift.seatsBooked || 0))
                                    ? seat === 1 ? 'bg-green-400' : 'bg-gray-300'
                                    : 'bg-red-400'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
