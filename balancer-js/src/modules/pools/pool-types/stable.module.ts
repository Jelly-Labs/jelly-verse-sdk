import { StablePoolExit } from './concerns/stable/exit.concern';
import { StablePoolJoin } from './concerns/stable/join.concern';
import { StablePoolLiquidity } from './concerns/stable/liquidity.concern';
import { StablePoolSpotPrice } from './concerns/stable/spotPrice.concern';
import { StablePoolPriceImpact } from './concerns/stable/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Stable implements PoolType {
  constructor(
    chainId: number,
    public exit: ExitConcern = new StablePoolExit(chainId),
    public join: JoinConcern = new StablePoolJoin(chainId),
    public liquidity: LiquidityConcern = new StablePoolLiquidity(),
    public spotPriceCalculator: SpotPriceConcern = new StablePoolSpotPrice(),
    public priceImpactCalculator: PriceImpactConcern = new StablePoolPriceImpact()
  ) {}
}
