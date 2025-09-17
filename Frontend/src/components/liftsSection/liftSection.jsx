import { LiftCard } from "../liftCard/liftCard";

export const LiftsSection = ({ lifts }) => {
    console.log('Lifts in LiftsSection:', lifts);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    // Create three separate arrays
    const todayLifts = lifts.filter(lift => {
        const liftDate = new Date(lift.departureDate);
        const liftDateOnly = new Date(liftDate);
        liftDateOnly.setHours(0, 0, 0, 0);
        
        const now = new Date();
        
        // Check if it's today AND the time hasn't passed yet
        return liftDateOnly.getTime() === today.getTime() && liftDate > now;
    }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by full datetime (includes time)
    
    const tomorrowLifts = lifts.filter(lift => {
        const liftDate = new Date(lift.departureDate);
        liftDate.setHours(0, 0, 0, 0);
        return liftDate.getTime() === tomorrow.getTime();
    }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by full datetime (includes time)
    
    const otherLifts = lifts.filter(lift => {
        const liftDate = new Date(lift.departureDate);
        liftDate.setHours(0, 0, 0, 0);
        return liftDate.getTime() !== today.getTime() && liftDate.getTime() !== tomorrow.getTime();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log('Today lifts:', todayLifts);
    console.log('Tomorrow lifts:', tomorrowLifts);
    console.log('Other lifts:', otherLifts);

    return (
        <>
            <section className="flex flex-col gap-8">
                {/* Today's Lifts */}
                {todayLifts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Today</h2>
                        <div className="flex flex-col gap-4">
                            {todayLifts.map(lift => (
                                <LiftCard key={lift.id} lift={lift} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Tomorrow's Lifts */}
                {tomorrowLifts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Tomorrow</h2>
                        <div className="flex flex-col gap-4">
                            {tomorrowLifts.map(lift => (
                                <LiftCard key={lift.id} lift={lift} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Lifts */}
                {otherLifts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Other Dates</h2>
                        <div className="flex flex-col gap-4">
                            {otherLifts.map(lift => (
                                <LiftCard key={lift.id} lift={lift} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No lifts message */}
                {todayLifts.length === 0 && tomorrowLifts.length === 0 && otherLifts.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">No lifts available at the moment.</p>
                    </div>
                )}
            </section>
        </>
    )
}