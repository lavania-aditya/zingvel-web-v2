import { IWanderlistItem } from '@/interfaces/IWanderlist';

interface WanderlistDetailClientProps {
  wanderlistData: IWanderlistItem;
}

declare function WanderlistDetailClient(props: WanderlistDetailClientProps): JSX.Element;

export default WanderlistDetailClient;
