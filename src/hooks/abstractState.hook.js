import { useState } from 'react';

function useGlobalSetState(initialValue) {

    const [value, setValue] = useState(initialValue);

    const onChange = (stateParam) => {
        setValue(stateParam);
    }

    return { value, onChange }
}

export default useGlobalSetState;