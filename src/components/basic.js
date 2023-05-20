import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';

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
                panelColors={{ 0: '#EBEDF0', 20: '#C6E48B', 40: '#7BC96F', 60: '#239A3B', 80: '#196127' }}
                rectRender={(props, data) => {
                    // if (!data.count) return <rect {...props} />;
                    return (
                      <Tooltip key={props.key} placement="top" content={`count: ${data.count || 0}`}>
                        <rect {...props} />
                      </Tooltip>
                    );
                  }}
             />

        </div>
    )
};

export default Basic