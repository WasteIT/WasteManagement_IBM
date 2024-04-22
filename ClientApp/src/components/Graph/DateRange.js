export const DateRange = ({ dateRange, onDateChange }) => {
    return (
        <span>
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
        </span>
    );
};
