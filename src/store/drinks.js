import { action, computed, thunk } from 'easy-peasy';
import { supabase } from '../supabaseClient';

const drinks = {
  items: [],
  categories: [],
  loading: false,
  flattedData: computed((state) => {
    return state.items.flatMap((drink) => drink.items);
  }),
  drinked: computed((state) => {
    return state.flattedData.filter((el) => !!el.tried)?.length || 0;
  }),
  total: computed((state) => {
    return state.flattedData.length;
  }),

  setLoading: action((s, v) => {
    s.loading = v;
  }),
  setData: action((s, list) => {
    s.items = Array.isArray(list) ? list : [];
  }),

  fetchDrinks: thunk(async (actions, params = {}) => {
    actions.setLoading(true);
    try {
      const { data: categories } = await supabase
        .from('categories')
        .select(`*`);
      const mappedCategories = {};
      categories.forEach((el) => {
        mappedCategories[el.id] = el.name;
      });
      const { data: drinks } = await supabase.from('drinks').select(`*`);

      const mappedDrinks = {};
      drinks.forEach((el) => {
        if (!mappedDrinks[el.category_id]) {
          mappedDrinks[el.category_id] = [];
        }
        mappedDrinks[el.category_id].push({
          ...el,
          groupName: mappedCategories[el.category_id],
        });
      });

      const totalResult = categories.map((category) => {
        return {
          groupName: category.name,
          items: mappedDrinks[category.id].sort((a, b) => a.id - b.id),
        };
      });

      actions.setData(totalResult);
    } catch (e) {
      console.log(e?.message ?? 'Ошибка загрузки');
    } finally {
      actions.setLoading(false);
    }
  }),

  tryDrink: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      await supabase
        .from('drinks')
        .update(payload)
        .eq('id', payload.id)
        .select();

      actions.fetchDrinks();
    } catch (e) {
      console.log(e);
    } finally {
      actions.setLoading(false);
    }
  }),
};

export default drinks;
