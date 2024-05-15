export default function Action({fraction, action, binId, numberOfBins, description}){

/**
 * Action is a functional component that renders an action card based on the provided props.
 * 
 * @param {string} fraction - The type of waste fraction associated with the action.
 * @param {string} action - The type of action to be performed (e.g., "add", "remove", "check", "schedule").
 * @param {number} binId - The ID of the waste bin (relevant for "check" action).
 * @param {number} numberOfBins - The number of waste bins involved in the action (relevant for "add" and "remove" actions).
 * @param {string} description - The description of the action (relevant for "schedule" action).
 * @returns {JSX.Element} - The JSX element representing the action card.
 */

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