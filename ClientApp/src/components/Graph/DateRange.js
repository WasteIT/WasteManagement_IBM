export const DateRange = ({ dateRange, onDateChange, isChrome }) => {
    const setLast90Days = () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 90);
        onDateChange({ startDate, endDate: currentDate });
    };

    const setLastYear = () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setFullYear(currentDate.getFullYear() - 1);
        onDateChange({ startDate, endDate: currentDate });
    };

    return (
        <div>
            <div className="date-range-picker-wrapper-inner">
                <div className="single-date-range-picker-wrapper">
                    {!isChrome ? (
                        <img
                            src="./images/calendar.png"
                            alt="calendar"
                            className="if-chrome-image-styles"
                        />
                    ) : <></>}
                    <input
                        type="date"
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
                <div style={{ position: 'relative', marginLeft: '1rem', marginRight: '1rem'}}>
                    {!isChrome ? (
                        <img
                            src="./images/calendar.png"
                            alt="calendar"
                            className="if-chrome-image-styles"
                        />
                    ) : <></>}
                    <input
                        type="date"
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
                <button className='fixed-date-range-button' onClick={setLast90Days}>Last 90 Days</button>
                <button className='fixed-date-range-button' onClick={setLastYear}>Last Year</button>
            </div> 
        </div>
    );
};
