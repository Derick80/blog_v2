import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { bucketItems } from '~/models/s3.server'

const data = [
  {
    id: 112,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221203_053037125.NIGHT.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 113,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221203_053058006.MP.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 114,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221203_185133183.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 115,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221204_032441160.MP.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 116,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221204_041536318.NIGHT.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 117,
    album: 'NYC',
    imageDescription: '',
    imageTitle: '',
    city: 'New York City',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/nyc2022/PXL_20221204_062705997.jpg',
    year: '2022',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 8,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_111017.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 9,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_111048.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 10,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_111058.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 11,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_111110.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 12,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_113119.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 13,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_153614.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 14,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_153621.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 15,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_154233.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 16,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_154733.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 17,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_160412.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 18,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_160435.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 19,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_222655.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 21,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_125305.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 22,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_125321.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 23,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_125330.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 24,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130135.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 25,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130200.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 26,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130306.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 27,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130314.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 28,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130325.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 29,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_130521.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 30,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_143223.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 31,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_143318.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 32,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_143343.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 33,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_143438.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 34,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/DJI_20180301_143549.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 35,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_121409.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 36,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_122440.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 37,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_122648.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 38,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_125409.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 39,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_125615.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 40,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_140051.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 41,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_140053.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 42,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Fuji',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/fuji/MVIMG_20180301_144212.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 44,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_151929.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 45,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_151935.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 46,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_151941.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 47,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_152204.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 48,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_153359.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 49,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_153405.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 50,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_153523.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 51,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154049.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 52,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154439.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 53,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154529.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 54,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154532.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 55,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154535.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 56,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_154635.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 57,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_160809.mp4',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 58,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_160849.mp4',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 59,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_161057.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 60,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_161251.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 61,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_165805.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 62,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_170048.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 63,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_170214.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 64,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180302_170217.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 65,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_095114.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 66,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_095503.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 67,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_095713.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 68,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_095716.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 69,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_095722.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 70,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_100001.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 71,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_101044.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 72,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_101543.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 73,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_101547.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 74,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_101615.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 75,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_103140.mp4',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 76,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/DJI_20180303_103301.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 77,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_105422.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 78,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_153220.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 79,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_153240.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 80,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_153303.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 81,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_170803.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 82,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_170812.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 83,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180302_172013.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 84,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_092725.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 85,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_092800.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 86,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_093035.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 87,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_093122.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 88,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_093318.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 89,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_093707.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 90,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_094628.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 91,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_100250.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 92,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_100325.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 93,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_100827.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 94,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_101734.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 95,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_102500.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 96,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_131401.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 97,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/MVIMG_20180303_132712.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 98,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180302_151925.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 99,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180302_153352.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 100,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180302_154124.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 2,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/DJI_20180224_153024.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 102,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180302_170205.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 103,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180303_095101.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 104,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180303_095710.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 106,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shimokitazawa',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shimo/MVIMG_20180304_205531.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 107,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shimokitazawa',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shimo/MVIMG_20180305_135701.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 108,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shimokitazawa',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shimo/MVIMG_20180305_150745.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 109,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shimokitazawa',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shimo/MVIMG_20180307_115140.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 110,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shimokitazawa',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shimo/MVIMG_20180307_160853.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 101,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Kyoto',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/kyoto/PANO_20180302_154523.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 3,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/DJI_20180224_153039.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 4,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/DJI_20180224_153414.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 5,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180223_223901.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 6,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_110750.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  },
  {
    id: 7,
    album: 'Japan',
    imageDescription: '',
    imageTitle: '',
    city: 'Shinjuku',
    imageUrl:
      'https://dchtravelbucket.s3.us-east-2.amazonaws.com/Japan2018/shinjuku/MVIMG_20180224_110816.jpg',
    year: '2018',
    userId: 'c012603c-2151-448c-8ddb-e816df3afb30'
  }
]
export async function loader(request: LoaderArgs) {
  const byGroup = data.reduce((acc, item) => {
    const { album, city, year } = item
    const key = `${album}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string, typeof Image[]>)

  const [NYC, Japan] = Object.values(byGroup)
  console.log('NYC', NYC, 'Japan', Japan)

  return json({ byGroup })
}

// import { Button } from '~/components/shared/button'
// import { ImagePlaceHolder } from '~/components/shared/icons'

// const button_base =
//   'inline-flex items-center border justify-center rounded-xl px-4 py-2 font-medium leading-4 transition duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 disabled:cursor-not-allowed'

// const btn_outline = `bg-slate-100 border shadow-sm text-slate-600 border-slate-200 hover:bg-slate-700
//         hover:border-red-300  dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700  dark:hover:border-sky-300`

// const btn_solid = `bg-slate-600 border shadow-sm text-slate-300 dark:text-slate-200 dark:border-none border-slate-700 hover:bg-slate-800`
// const btn_success = `bg-green-500 shadow-sm text-slate-900 dark:text-slate-100  hover:bg-green-600`
// const btn_warn = `bg-yellow-500 border shadow-sm text-slate-900 dark:text-slate-100 border-yellow-500 hover:bg-yellow-600`
// const btn_danger = `bg-red-500 shadow-sm text-slate-900 dark:text-slate-100 border-red-500 hover:bg-red-600`

// const btn_solid_primary = `bg-green-500 border shadow-sm text-slate-900 dark:text-slate-100 `
// export default function Index() {
//   return (
//     <div className='flex min-h-screen flex-row items-center justify-center py-2'>
//       <div className='flex h-full w-full flex-col border-2  '>
//         <div className='min-h-screen p-2'>
//           dark
//           <ul>
//             Base
//             <li>
//               <Button className={`${button_base}`}>base</Button>
//             </li>
//           </ul>
//           <ul>
//             Outline
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_outline}`}>
//                 outline
//               </Button>
//             </li>
//             <li>
//               <Button
//                 className={`${button_base} ${btn_outline} ${btn_success}`}
//               >
//                 success
//               </Button>
//             </li>
//           </ul>
//           <ul className=''>
//             Solid
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_solid}`}>solid</Button>
//             </li>
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_solid_primary}`}>
//                 success
//               </Button>
//             </li>
//             <li>
//               <Button className={`${button_base} ${btn_warn}`}>warn</Button>
//             </li>
//             <li>
//               <Button className={`${button_base} ${btn_danger}`}>error</Button>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className='flex h-full w-full flex-row border-2 '>
//         <div className='min-h-screen p-2'>
//           Light
//           <ul>
//             Base
//             <li>
//               <Button className={`${button_base}`}>base</Button>
//             </li>
//           </ul>
//           <ul>
//             Outline
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_outline}`}>
//                 outline
//               </Button>
//             </li>
//             <li>
//               <Button
//                 className={`${button_base} ${btn_outline} ${btn_success}`}
//               >
//                 success
//               </Button>
//             </li>
//           </ul>
//           <ul className=''>
//             Solid
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_solid}`}>solid</Button>
//             </li>
//             <li>
//               {' '}
//               <Button className={`${button_base} ${btn_solid_primary}`}>
//                 success
//               </Button>
//             </li>
//             <li>
//               <Button className={`${button_base} ${btn_warn}`}>warn</Button>
//             </li>
//             <li>
//               <Button className={`${button_base} ${btn_danger}`}>error</Button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }
