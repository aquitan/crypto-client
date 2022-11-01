import { store } from "../../../../../../..";
import Button from "../../../../../../components/UI/Button/Button";
import { deleteData } from "../../../../../../services/StaffServices";
import { getSwitchQuery } from "../../../../../../utils/getSwitchQuery";

const AddedCard = ({onDisconnectCard}) => {
    

    return (
        <div style={{maxWidth: '200px'}}>
            <img width={'100%'} src='/img/credit-card.png' alt='credit-card' />
            <Button onClick={onDisconnectCard} style={{width: '100%'}} classname={['btnRed']}>Disconnect</Button>
        </div>
    )
}
export default AddedCard;