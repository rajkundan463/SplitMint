export default function ParticipantSelector({
    participants,
    selected,
    toggle
}){

    return(

        <div className="grid grid-cols-2 gap-3">

            {participants.map(p=>(

                <div
                    key={p.id}
                    onClick={()=>toggle(p.id)}
                    className={`
                        p-3 rounded-xl border cursor-pointer
                        flex items-center gap-2
                        transition
                        ${selected.includes(p.id)
                        ?"bg-black text-white"
                        :"hover:bg-gray-100"}
                    `}
                >

                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                        style={{background:p.color}}
                    >
                        {p.name.charAt(0)}
                    </div>

                    {p.name}

                </div>

            ))}

        </div>
    )
}
