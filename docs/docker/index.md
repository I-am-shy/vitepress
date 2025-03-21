# docker 

## 什么是docker

Docker 是一个用于开发、交付和运行应用程序的开放平台。Docker 使您能够将应用程序与基础设施分开，以便您可以快速交付软件。使用 Docker，您可以像管理应用程序一样管理基础设施。通过利用 Docker 的方法来交付、测试和部署代码，您可以显著减少编写代码和在生产环境中运行代码之间的延迟。


::: details what is docker

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker's methodologies for shipping, testing, and deploying code, you can significantly reduce the delay between writing code and running it in production.

:::

## docker 容器与镜像 

容器和镜像是Docker的两个核心概念。
在Docker技术体系里，容器和镜像是两个核心概念，镜像是容器的模版（template），容器是镜像的实例（instance）。

::: warning 注意
镜像和容器相当于源代码和可执行程序的关系，容器停止执行时，容器的状态会消失，但是镜像不会消失。
:::

### Docker镜像 （image）
- **定义**：Docker镜像可以理解为一个只读的模板，它包含了运行应用程序所需的所有文件、代码、依赖项、环境变量以及配置文件等。你可以把它想象成是一个应用程序的“安装包”，这个“安装包”里面已经集成了应用运行所需要的一切，并且可以在任何支持Docker的环境中使用。
- **特点**
    - **分层结构**：镜像采用分层存储的方式构建，每一层都是一个文件系统的变更集合。这种分层结构使得镜像的构建、传输和存储更加高效。例如，多个镜像可能会共享一些基础层，当你拉取一个新镜像时，Docker只会下载那些与已有镜像不同的层。
    - **只读性**：镜像一旦创建就不能被修改，这保证了镜像的一致性和可重复性。如果需要对镜像进行修改，只能基于该镜像创建一个新的镜像。
- **用途**：镜像主要用于创建Docker容器。你可以从Docker Hub等镜像仓库中拉取现有的镜像，也可以根据自己的需求创建自定义的镜像。

### Docker容器 （container）
- **定义**：Docker容器是基于Docker镜像创建的一个可运行的实例。它是一个独立的、隔离的环境，包含了应用程序运行所需的所有资源。容器可以被启动、停止、删除等操作，就像一个轻量级的虚拟机，但它比虚拟机更加轻量级、快速和高效。
- **特点**
    - **隔离性**：容器使用Linux内核的命名空间和控制组（cgroups）技术实现了进程、网络、文件系统等方面的隔离。这意味着在一个容器中运行的应用程序不会影响到其他容器或宿主机上的应用程序。
    - **可移植性**：由于容器依赖于镜像，而镜像具有跨平台的特性，所以容器可以在任何支持Docker的环境中运行，无论是开发环境、测试环境还是生产环境。
    - **轻量化**：容器不需要像虚拟机那样模拟完整的操作系统，它直接共享宿主机的内核，因此占用的资源更少，启动速度更快。
- **用途**：容器主要用于运行应用程序。你可以将应用程序打包成镜像，然后基于该镜像创建容器来运行应用。容器的启动和停止非常快速，这使得它非常适合用于微服务架构和持续集成/持续部署（CI/CD）流程。

::: tip 两者的关系
镜像和容器是一种“模板 - 实例”的关系。镜像是静态的，它提供了应用程序运行所需的所有文件和配置；而容器是动态的，它是镜像的运行时实例。你可以基于同一个镜像创建多个容器，每个容器都是相互独立的，并且可以有不同的运行状态和配置。
:::

## 安装 docker 桌面程序

在[docker 官网](https://www.docker.com/)安装 docker 的桌面程序。

根据操作系统选择对应的安装包，Linux 选择 `Docker Desktop for Linux`，macOS 选择 `Docker Desktop for Mac`，Windows 选择 `Docker Desktop for Windows`。

## 汉化界面

参考[Docker Desktop汉化包](https://github.com/asxez/DockerDesktop-CN?tab=readme-ov-file)的流程。














