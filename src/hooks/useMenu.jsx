import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // const [menu, setMenu] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //     fetch('http://localhost:5000/menu')
  //    .then(res => res.json())
  //    .then(data => {
  //        setMenu(data)
  //        setLoading(false)
  //    })
  //    .catch(error => {
  //        setError(error)
  //        setLoading(false)
  //    })
  // }, [])

  // return [menu, loading, error];
  const {
    data: menu = [],
    isPending: loding,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menu, loding, refetch];
};

export default useMenu;
