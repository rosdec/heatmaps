import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const Basic = (commitsData) => {
    const [range, setRange] = useState(5)

    return (
        <div>
            <input type="range" min="0" max="5" step="0.1" value={range} onChange={(e) => setRange(e.target.value)} /> {range}

            <HeatMap 
                value={commitsData.commitsData} 
                startDate={new Date(commitsData.commitsData[0].date)}
                width={600}
                legendRender={(props) => <rect {...props} y={props.y + 10} rx={range} />}

                rectProps={{
                    rx: range
                }}
             />

        </div>
    )
};

export default Basic