import React, {
    DependencyList,
    ReactElement,
    useEffect,
    useState
} from "react";
/* eslint-disable react-hooks/rules-of-hooks,react-hooks/exhaustive-deps */
export function loader<T>(
    loader: () => Promise<T>,
    render: (t: T) => React.ReactNode,
    dependencyList: DependencyList = []
): ReactElement {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        setData(null);
        loader().then(setData);
    }, dependencyList);

    if (data != null) {
        return <>{render(data)}</>;
    }
    return <span>Loading</span>;
}
