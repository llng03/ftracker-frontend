export function ShowRoutes() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={<MonthOverview />} 
            />
            <Route 
                path="/pots" 
                element={<PotOverview />} 
            />
            <Route
                path="/statistics"
                element={<StatisticsOverview />}
            />
        </Routes>
    );
}