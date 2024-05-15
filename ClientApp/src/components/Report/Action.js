export default function Action({fraction, action, binId, numberOfBins, description}){

    function GetText(action) {
        if (action === "add") {
            return `Add ${numberOfBins} ${fraction} bins to your waste yard.`
        }
        if (action === "remove") {
            return `Remove ${numberOfBins} ${fraction} bins from your waste yard.`
        }
        if (action === "check") {
            return `Inspect bin #${binId} of type ${fraction}`
        }
        if (action === "schedule") {
            return `Change the pickup schedule for your ${fraction} bins to ${description}. `
        }
        else {
            return "Oh no!"
        }
    }
    function GetColor(action) {
        if (action === "add") {
            return "#A5C47D"
        }
        if (action === "remove") {
            return "#EE7B89"
        }
        if (action === "check") {
            return "#E9B968"
        }
        if (action === "schedule") {
            return "#96C6E9"
        }
        else {
            return "Oh no!"
        }
    }

    return (
            <div style={{display: 'flex', padding: '0.5rem'}}>
                <img style={{height: '4rem', borderRadius: '13px'}} src={`./images/${fraction}.png`} alt="Card cap"/>
                
                <div style={{alignItems: 'center', display: 'flex', background: GetColor(action), borderRadius: '25px', width: '30rem',marginLeft: '2rem'}}>
                    <img style={{width: '2rem', marginLeft: '0.5rem', marginRight: '0.5rem'}} src={`./images/${action}.png`} alt="Card cap"/>
                    <div style= {{marginTop: '1rem'}}>
                        <p>{GetText(action)}</p> 
                    </div>

                </div>
            </div>

    );
}