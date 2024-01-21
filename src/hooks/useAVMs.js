import results from '../mocks/listAll.json'

export function useAVMs () {
    const avms = results.data

    const mappedAVMs = avms?.map(avm => ({
      id: avm.id,
      address: avm.address,
      city: avm.city,
      has_elevator: avm.has_elevator,
      latitude: avm.latitude,
      longitude: avm.longitude,
      price_m2: avm.price_m2,
      total_area: avm.total_area,
      total_price: avm.total_price,
      valuation_date: avm.valuation_date,
      year_of_construction: avm.year_of_construction,
      year_of_renovation: avm.year_of_renovation,

    }))
    return { avms: mappedAVMs }
  }
