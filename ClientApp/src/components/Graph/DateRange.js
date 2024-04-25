import calendarImage from './calendar.png'; // Import the calendar image

export const DateRange = ({ dateRange, onDateChange }) => {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                {/* Input for start date */}
                <div style={{ position: 'relative', marginRight: '2rem' }}>
                    {/* Calendar image */}
                    <img
                        src={calendarImage}
                        alt="calendar"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: '1',
                            pointerEvents: 'none',
                            width: '17px', // Adjust the width of the image as needed
                        }}
                    />
                    {/* Date input */}
                    <input
                        type="date"
                        style={{
                            paddingRight: '50px',
                            borderRadius: '20px',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.40)',
                        }}
                        value={dateRange.startDate.toISOString().split('T')[0]}
                        onChange={e => {
                            const newStartDate = new Date(e.target.value);
                            if (dateRange.endDate > newStartDate) {
                                onDateChange({ ...dateRange, startDate: newStartDate });
                            } else {
                                const newEndDate = new Date(newStartDate);
                                newEndDate.setDate(newEndDate.getDate() + 30);
                                onDateChange({ startDate: newStartDate, endDate: newEndDate });
                            }
                        }}
                    />
                </div>
                {/* Input for end date */}
                <div style={{ position: 'relative' }}>
                    {/* Calendar image */}
                    <img
                        src={calendarImage}
                        alt="calendar"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: '1',
                            pointerEvents: 'none',
                            width: '17px', // Adjust the width of the image as needed
                        }}
                    />
                    {/* Date input */}
                    <input
                        type="date"
                        style={{
                            paddingRight: '50px',
                            borderRadius: '20px',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.40)',
                        }}
                        value={dateRange.endDate.toISOString().split('T')[0]}
                        onChange={e => {
                            const newEndDate = new Date(e.target.value);
                            if (dateRange.startDate < newEndDate) {
                                onDateChange({ ...dateRange, endDate: newEndDate });
                            } else {
                                const newStartDate = new Date(newEndDate);
                                newStartDate.setDate(newStartDate.getDate() - 30);
                                onDateChange({ startDate: newStartDate, endDate: newEndDate });
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
