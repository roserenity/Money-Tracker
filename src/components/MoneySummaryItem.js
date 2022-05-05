export default function MoneySummaryCard(prop){
    return (
        <div key={prop.statement} className="flex-initial w-fit bg-white p-3 rounded-lg drop-shadow-md font-bold">
            <p className="text-center text-base">{prop.statement}</p>
            <p className="text-center text-lg">{prop.value}</p>
        </div>
    )
}