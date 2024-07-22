import { useNavigate } from "react-router-dom"
import { isProduct } from "@/env"



export const useReportShare = () => {
    const navigate = useNavigate()
    return {
        reportShare: (shareURL = '', { isHref } = { isHref: false }) => {
            if (!shareURL) {
                return false
            }
            if (isHref) {
                return navigate(`/${shareURL}`)
            }
            const url = isProduct ? `/dashboard-report/${shareURL}` : `/report/${shareURL}`

            return window.open(
                url,
                url
            );

        }
    }
}
