import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "./groupApi";
import { useGroup } from "../../context/GroupContext";

export default function GroupSwitcher() {

    const { selectedGroup, setSelectedGroup } = useGroup();

    const { data: groups } = useQuery({
        queryKey: ["groups"],
        queryFn: fetchGroups
    });


    useEffect(() => {
        if (!selectedGroup && groups?.length) {
            setSelectedGroup(groups[0]);
        }
    }, [groups]);

    return (

        <select
            value={selectedGroup?.id || ""}
            onChange={(e) => {

                const group = groups.find(
                    g => g.id === e.target.value
                );

                setSelectedGroup(group);
            }}
            className="border rounded-lg px-3 py-2 bg-white"
        >

            {groups?.map(group => (

                <option
                    key={group.id}
                    value={group.id}
                >
                    {group.name}
                </option>

            ))}

        </select>
    );
}
