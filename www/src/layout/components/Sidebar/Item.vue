<script>
import svgIcons from '@/icons'
export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        }
    },
    render(h, context) {
        const { icon, title } = context.props;
        const vnodes = [];
        let isSvgIcon = svgIcons.includes(icon)
        if (isSvgIcon) {
            vnodes.push(<svg-icon icon-class={icon} class-name="disabled" />);
        } else {
            vnodes.push(<i class={icon}></i>);
        }

        if (title) {
            vnodes.push(<span slot="title">{title}</span>);
        }
        return vnodes;
    }
};
</script>
