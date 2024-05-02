import Card from 'react-bootstrap/Card';
import Action from './Action'
export default function Actions(){
    return (
        <div style={{width: '40rem', background: '#F5F5F5', borderRadius: '25px',boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.5)'}}>
            <div style={{display: 'flex', padding: '1rem 1rem 1rem 1rem'}}>
                <img style={{width: '5rem'}} src='./images/Desk_fill.png' alt="Card image cap"/>
                <div style={{alignContent: 'center', paddingLeft: '1rem'}}>
                    <h3>Recommended actions</h3>
                </div>
            </div>
            <div style = {{padding: '1rem'}}>
                <Action
                   fraction={"General waste"} 
                   action={"ActionRemove"}
                   binId={"2"}
                   numberOfBins={"1"}
                />
                <Action
                    fraction={"Cardboard"} 
                    action={"ActionAdd"}
                    binId={"0"}
                    numberOfBins={"3"}
                />
                <Action
                    fraction={"Metal"} 
                    action={"ActionAdd"}
                    binId={"3"}
                    numberOfBins={"1"}
                />
                <Action
                    fraction={"General waste"} 
                    action={"ActionInspect"}
                    binId={"3"}
                    numberOfBins={"1"}
                />
                
            </div>
        </div>

    );
}

