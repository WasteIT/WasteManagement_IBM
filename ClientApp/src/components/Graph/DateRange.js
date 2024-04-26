

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
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'relative', marginLeft: '1rem', marginRight: '1rem'}}>
                    {!isChrome ? (
                        <img
                            src="./images/calendar.png"
                            alt="calendar"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: '1',
                                pointerEvents: 'none',
                                width: '17px'
                            }}
                        />
                    ) : <></>}
                    <input
                        type="date"
                        style={{
                            paddingRight: '50px',
                            borderRadius: '20px',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.40)',
                            backgroundColor: 'white'
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
                <div style={{ position: 'relative', marginLeft: '1rem', marginRight: '1rem'}}>
                    {!isChrome ? (
                        <img
                            src="./images/calendar.png"
                            alt="calendar"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: '1',
                                pointerEvents: 'none',
                                width: '17px'
                                }}
                        />
                    ) : <></>}
                    <input
                        type="date"
                        style={{
                            paddingRight: '50px',
                            borderRadius: '20px',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.40)',
                            backgroundColor: 'white'
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
                <button className='wasteItButton' onClick={setLast90Days}>Last 90 Days</button>
                <button className='wasteItButton' onClick={setLastYear}>Last Year</button>
            </div>
            
        </div>
    );
};
