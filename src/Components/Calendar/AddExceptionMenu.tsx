import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useWindowSize from "../../hooks/useWindowSize";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";

interface AddExceptionMenuType {
    type: number | null
    timestamp: number
    close: () => void
}

export default function AddExceptionMenu({ type, timestamp, close }: AddExceptionMenuType) {
    const { active, schedules } = useAppSelector(state => state.schedules);
    const schedule = schedules.find(({ id }) => id === active);
    const types = schedule?.types.filter(({ id }) => id !== type) || [];
    const { addException } = SchedulesSlice.actions;
    const dispatch = useAppDispatch();
    const [width] = useWindowSize();
    const isMobile = width < 600;

    function setException(type: number | null) {
        if (type !== null) {
            dispatch(addException([timestamp, type]));
        }
        close();
    }

    return (
        <div
            className={isMobile ? "context-menu context-menu-mobile" : "context-menu"}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        >
            {types.map(({ id, title }) => 
                <div
                    key={id}
                    className="option"
                    onClick={() => setException(id)}
                >
                    <FormattedMessage
                        id="Set this date"
                        defaultMessage={`Set this date as "{title}"`}
                        values={{ title }}
                    />
                </div>
            )}
        </div>
    )
}