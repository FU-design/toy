import { mockData, getImgs } from '../../../src/utils/mock.ts'
import { describe, expect, it, } from 'vitest'

describe('mockData', () => {
  it('should return data contain code, data, msg property', async () => {
    const defaultSize = 1000
    const respones = await mockData();
    expect(respones).toHaveProperty('code', 200)
    expect(respones).toHaveProperty('data')
    expect(respones).toHaveProperty('msg')
    expect(respones.data).toHaveLength(defaultSize)
  })

  it('should return 50 pieces of data after some time', async () => {
    const size = 50
    const respones = await mockData(50);
    expect(respones.data).toHaveLength(size)
  })

  it('should reject with error if the request fails', async () => {
    const size = -1
    const promise = mockData(size)
    await expect(promise).rejects.toThrow('size must be greater than 0')
  })
})


describe('getImgs', async () => {
  it('should handle default parameters correctly', async () => {
    const defaultSize = 30
    const imgList = await getImgs();
    expect(imgList).toHaveLength(defaultSize)
    expect(imgList.every(url => url.startsWith('https://picsum.photos/id/'))).toBe(true)
  })

  it('should return return 100 pictures of 500*500', async () => {
    const size = 100
    const imgList = await getImgs(size, 500, 500);
    expect(imgList).toHaveLength(size)
    expect(imgList.every(url => url.startsWith('https://picsum.photos/id/'))).toBe(true)
  })

  it('should reject with error if the request fails', async () => {
    const size = -1
    const promise = getImgs(size)
    await expect(promise).rejects.toThrow('size must be greater than 0')
  })
})