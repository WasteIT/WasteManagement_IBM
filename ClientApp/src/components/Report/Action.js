export default function Action({fraction, action, binId, numberOfBins}){

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function GetText(action) {
        if (action === "add") {
            return `Add ${numberOfBins} ${capitalizeFirstLetter(fraction)} bins to your waste yard.`
        }
        if (action === "remove") {
            return `Remove ${numberOfBins} ${capitalizeFirstLetter(fraction)} bins from your waste yard.`
        }
        if (action === "check") {
            return `Inspect bin #${binId} in ${capitalizeFirstLetter(fraction)} fraction`
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
        else {
            return "Oh no!"
        }
    }

    return (
            <div style={{display: 'flex', padding: '0.5rem'}}>
                <img style={{height: '4rem', borderRadius: '13px'}} src={`./images/${fraction}.png`} alt="Card cap"/>
                
                <div style={{alignItems: 'center', display: 'flex', background: GetColor(action), borderRadius: '25px',boxShadow: '-10px 10px 20px rgba(33, 82, 75, 0.35)',width: '30rem',marginLeft: '2rem'}}>
                    <img style={{width: '2rem', marginLeft: '0.5rem', marginRight: '0.5rem'}} src={`./images/${action}.png`} alt="Card cap"/>
                    <div style= {{marginTop: '1rem'}}>
                        <p>{GetText(action)}</p> 
                    </div>

                </div>
            </div>

    );
}