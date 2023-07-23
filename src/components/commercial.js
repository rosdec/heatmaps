import React, { useEffect, useState } from 'react';
import { HeatMapComponent, Inject, Adaptor, Legend, Tooltip } from '@syncfusion/ej2-react-heatmap';

const Commercial = ({ commitsData }) => {
    const [values, setValues] = useState([])

    const monthsLabels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const daysLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


    useEffect(() => {
        var newValues = [];

        const chunkSize = 7;
        for (let i = 0; i < commitsData.length; i += chunkSize) {
            const chunk = commitsData.slice(i, i + chunkSize);
            newValues.push(chunk.map(a => a.count))
        }

        setValues(newValues);
        //// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commitsData])

    return (<HeatMapComponent
        width='1000px'
        height='200px'
        xAxis={{
            opposedPosition: true,
            valueType: 'DateTime',
            minimum: new Date(2023, 0, 1),
            maximum: new Date(2023, 11, 31),
            intervalType: 'Days',
            showLabelOn: 'Months',
            labelFormat: 'MMM',
            increment: 7,
            labelIntersectAction: 'Rotate45'
        }}
        yAxis={{
            labels: daysLabels,
        }}
        dataSource={values}
        paletteSettings={{
            palette: [
                { color: "#EBEDF0" },
                { color: "#C6E48B" },
                { color: "#7BC96F" },
                { color: "#239A3B" },
                { color: "#196127" }
            ],
            type: "Fixed"
        }}
        cellSettings={{
            border: {
                radius: 4,
                width: 1,
                color: 'white'
            },
            showLabel: false,
            format: '{value}',
        }}>
        <Inject services={[Legend, Tooltip, Adaptor]} />
    </HeatMapComponent>);
}

export default Commercial; 