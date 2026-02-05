export default function SplitSelector({
    splitMode,
    setSplitMode
}){

    const modes=["equal","custom","percent"];

    return(

        <div className="flex gap-2">

            {modes.map(mode=>(

                <button
                    key={mode}
                    type="button"
                    onClick={()=>setSplitMode(mode)}
                    className={`
                        px-4 py-2 rounded-lg border transition
                        ${splitMode===mode
                        ?"bg-black text-white"
                        :"hover:bg-gray-100"}
                    `}
                >
                    {mode}
                </button>

            ))}

        </div>
    )
}
