import { iDate } from "../models/iDate";
import { iSchedule, TypesOfSchedule } from "../models/iSchedules";


export interface iScheduleDate extends iDate {
    type: number | null
    color?: string
}

export function transformScheduleDates(dates: iDate[], inputScheduleData?: iSchedule) {
    if (inputScheduleData) {
        const { firstDate, exceptions, types } = inputScheduleData;
        let countOfScheduleDays = types.reduce((prevValue, { value }) => prevValue + value, 0);
        let daysLeft = countOfScheduleDays;
        const startDateTimestamp = getTimestamp(firstDate);

        if (startDateTimestamp < getTimestamp(dates[0])) {
            const dayDiff = getDatesDiff(firstDate, dates[0]);
            daysLeft = countOfScheduleDays - (dayDiff % countOfScheduleDays);
        }

        return dates.map((date): iScheduleDate => {
            const dateTimestamp = getTimestamp(date);

            if (dateTimestamp >= startDateTimestamp) {
                let type = getType(types, daysLeft);
                const color = types.find(({ id }) => id === type)?.color;
                if (Object.keys(exceptions).map(item => Number(item)).indexOf(dateTimestamp) > -1) {
                    type = exceptions[dateTimestamp];
                }
                daysLeft = daysLeft > 1 ? daysLeft - 1 : countOfScheduleDays;
                return { ...date, type, color }
            }
            return { ...date, type: null }
        });
    } else {
        return dates.map(date => ({ ...date, type: null }));
    }
}


export function getTimestamp({ date, month, year }: iDate) {
    return new Date(year, month, date).getTime();
}


function getDatesDiff(start: iDate, current: iDate) {
    const timeDiff = getTimestamp(current) - getTimestamp(start);
    return Math.round(timeDiff/(1000 * 3600 * 24));
}


function getType(types: TypesOfSchedule[], initValue: number) {
    let type: number | null = null;
    let prevVal = 0;
    for (let i = types.length - 1; i >= 0; i--) {
        const { id, value } = types[i];
        if (value >= initValue - prevVal) {
            type = id;
            break;
        };
        prevVal += value;
    }
    return type;
}