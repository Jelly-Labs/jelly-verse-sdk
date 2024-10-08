import { LinearPoolExit } from './concerns/linear/exit.concern';
import { LinearPoolJoin } from './concerns/linear/join.concern';
import { LinearPoolLiquidity } from './concerns/linear/liquidity.concern';
import { LinearPoolSpotPrice } from './concerns/linear/spotPrice.concern';
import { LinearPriceImpact } from './concerns/linear/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';
import { Network } from '@/types';

export class Linear implements PoolType {
  constructor(
    private chainId: Network,
    public exit: ExitConcern = new LinearPoolExit(chainId),
    public join: JoinConcern = new LinearPoolJoin(),
    public liquidity: LiquidityConcern = new LinearPoolLiquidity(),
    public spotPriceCalculator: SpotPriceConcern = new LinearPoolSpotPrice(),
    public priceImpactCalculator: PriceImpactConcern = new LinearPriceImpact()
  ) {}
}
